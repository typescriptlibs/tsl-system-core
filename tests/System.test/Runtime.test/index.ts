import * as assert from 'assert';
import RuntimeExtension_test from './RuntimeExtension.test';
import RuntimeUtility_test from './RuntimeUtility.test';

export default function (): boolean
{
	try
	{
		assert.ok( RuntimeExtension_test(), 'RuntimeExtension.test' );
		assert.ok( RuntimeUtility_test(), 'RuntimeUtility.test' );
		return true;
	}
	catch ( error )
	{
		console.error( 'Runtime.test failed (' + error + ')' );
		return false;
	}
}
