import * as assert from 'assert';
import Dictionary_test from './Dictionary.test';

export default function (): boolean
{
	try
	{
		assert.ok( Dictionary_test(), 'Dictionary.test' );
		return true;
	}
	catch ( error )
	{
		console.error( 'Collections.test failed (' + error + ')' );
		return false;
	}
}
