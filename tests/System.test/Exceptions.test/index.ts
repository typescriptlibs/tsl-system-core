import * as assert from 'assert';
import Exception_test from './Exception.test';

export default function (): boolean
{
	try
	{
		assert.ok( Exception_test(), 'Exception.test' );
		return true;
	}
	catch ( error )
	{
		console.error( 'Exceptions.test failed (' + error + ')' );
		return false;
	}
}
