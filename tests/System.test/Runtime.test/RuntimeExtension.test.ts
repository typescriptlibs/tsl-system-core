import * as assert from 'assert';
import
{
	root,
	using,
	IDisposable,
}
	from 'tsl-system-core';

export default function (): boolean
{
	try
	{
		// root
		assert.deepStrictEqual( root, global,
			'RuntimeExtension.root <===> global'
		);

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
		assert.strictEqual( usingTest.disposeCalled, false,
			'usingTest.disposeCalled === false : ' + ( usingTest.disposeCalled + ' === false' )
		);
		using( usingTest,
			usingTest =>
			{
				assert.strictEqual( usingTest.disposeCalled, false,
					'usingTest.disposeCalled === false : ' + ( usingTest.disposeCalled + ' === false' )
				);
			}
		);
		assert.strictEqual( usingTest.disposeCalled, true,
			'usingTest.disposeCalled === true : ' + ( usingTest.disposeCalled + ' === true' )
		);

		return true;
	}
	catch ( error )
	{
		console.error( 'RuntimeExtension.test failed (' + error + ')\n' + error.stack );
		return false;
	}
}
