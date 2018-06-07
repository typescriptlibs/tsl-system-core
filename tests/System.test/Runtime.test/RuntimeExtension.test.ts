import * as assert from 'assert';
import
{
	lock,
	using,
	IDisposable,
	Object
}
	from '../../../sources';

export default function (): boolean
{
	let testCounter = 0;
	try
	{
		// lock
		var testLock = new Object(),
			assertSync = assert.async();
		lock( testLock, {
			locked: ( innerTestLock ) =>
			{
				var lockState = 1;
				++testCounter; // 1
				assert.strictEqual( this.getHashCode(), testLock.getHashCode() )
				++testCounter; // 2
				assert.strictEqual( innerTestLock.getHashCode(), testLock.getHashCode() )
				++testCounter; // 3
				lock( testLock, {
					locked: ( innerstTestLock ) =>
					{
						lockState = 2;
						throw new Error( 'Lock Exception Test' );
					},
					catch: ( error ) =>
					{
						assert.ok( !!error );
						assert.strictEqual( error.message, 'Lock Exception Test' );
						assert.strictEqual( lockState, 2 );
						assertSync();
					}
				} )
				++testCounter; // 4
				assert.strictEqual( lockState, 1 );
			},
			catch: ( error ) =>
			{
				assert.ok( false )
			}
		} );

		// using
		class UsingTest implements IDisposable
		{
			public disposeCalled = false;
			public dispose()
			{
				this.disposeCalled = true;
			}
		}
		let usingTest = new UsingTest();
		++testCounter; // 5
		assert.strictEqual( usingTest.disposeCalled, false );
		using( usingTest,
			usingTest =>
			{
				++testCounter; // 6
				assert.strictEqual( usingTest.disposeCalled, false );
			}
		);
		++testCounter; // 7
		assert.strictEqual( usingTest.disposeCalled, true );

		return true;
	}
	catch ( error )
	{
		console.error( 'RuntimeExtension.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
