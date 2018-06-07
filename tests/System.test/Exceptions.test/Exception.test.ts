import * as assert from 'assert';
import
{
	Exception,
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;

	try
	{
		let exceptionEmpty = new Exception();
		let exceptionError = new Exception( 'error message' );

		// equals
		++testCounter; // 1
		assert.strictEqual( exceptionEmpty.equals( exceptionError ), false );
		++testCounter; // 2
		assert.strictEqual( exceptionEmpty.equals( exceptionEmpty ), true );
		++testCounter; // 3
		assert.strictEqual( exceptionError.equals( exceptionEmpty ), false );
		++testCounter; // 4
		assert.strictEqual( exceptionError.equals( exceptionError ), true );

		// getHashCode
		++testCounter; // 5
		assert.strictEqual( exceptionEmpty.getHashCode(), exceptionEmpty.getHashCode() );
		++testCounter; // 6
		assert.strictEqual( exceptionError.getHashCode(), exceptionError.getHashCode() );
		++testCounter; // 7
		assert.notEqual( exceptionEmpty.getHashCode(), exceptionError.getHashCode() );

		// getType
		++testCounter; // 8
		assert.deepStrictEqual( exceptionEmpty.getType().classConstructor, Exception );
		++testCounter; // 9
		assert.deepStrictEqual( exceptionError.getType().classConstructor, Exception );
		++testCounter; // 10
		assert.strictEqual( exceptionEmpty.getType().fullName, 'tsl-system-core.Exception' );
		++testCounter; // 11
		assert.strictEqual( exceptionError.getType().fullName, 'tsl-system-core.Exception' );
		++testCounter; // 12
		assert.strictEqual( exceptionEmpty.getType().name, 'Exception' );
		++testCounter; // 13
		assert.strictEqual( exceptionError.getType().name, 'Exception' );
		++testCounter; // 14
		assert.strictEqual( exceptionEmpty.getType().packageName, 'tsl-system-core' );
		++testCounter; // 15
		assert.strictEqual( exceptionError.getType().packageName, 'tsl-system-core' );

		// toString
		++testCounter; // 16
		assert.strictEqual( exceptionEmpty.toString().indexOf( 'tsl-system-core.Exception\n    at new Exception (' ), 0 );
		++testCounter; // 17
		assert.strictEqual( exceptionError.toString().indexOf( 'tsl-system-core.Exception: error message\n    at new Exception (' ), 0 );

		// message
		++testCounter; // 18
		assert.strictEqual( exceptionEmpty.message.toString(), '' );
		++testCounter; // 19
		assert.strictEqual( exceptionError.message.toString(), 'error message' );

		// getClassName
		++testCounter; // 20
		assert.strictEqual( exceptionEmpty.getClassName().toString(), 'tsl-system-core.Exception' );
		++testCounter; // 21
		assert.strictEqual( exceptionError.getClassName().toString(), 'tsl-system-core.Exception' );

		let hasBeenThrown = false;
		try
		{
			exceptionError.throw();
		}
		catch ( error )
		{
			hasBeenThrown = true;

			// getStackTrace
			++testCounter; // 22
			assert.strictEqual( error.getStackTrace().toString().indexOf( '    at Exception.throw (' ), 0 );
		}

		// throw
		++testCounter // 23
		assert.strictEqual( hasBeenThrown, true );

		return true;
	}
	catch ( error )
	{
		console.error( 'Exception.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
