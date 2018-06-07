import * as assert from 'assert';
import
{
	Dictionary,
	String,
}
	from 'tsl-system-core';

export default function (): boolean
{
	try
	{
		let dictionary1: Dictionary<String, String> = new Dictionary<String, String>();
		let dictionary2: Dictionary<String, String> = new Dictionary<String, String>();
		assert.ok( dictionary1.equals( dictionary2 ), 'dictionary1.equals( dictionary2 )' );
		return true;
	}
	catch ( error )
	{
		console.error( 'Dictionary_test failed (' + error + ')' );
		return false;
	}
}
