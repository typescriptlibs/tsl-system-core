import * as assert from 'assert';
import
{
	Hashtable,
	String,
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;

	try
	{
		let hashtable1: Hashtable<String, String> = new Hashtable<String, String>();
		let hashtable2: Hashtable<String, String> = new Hashtable<String, String>();

		// add & count
		++testCounter; // 1
		assert.strictEqual( hashtable1.count, 0 );
		hashtable1.add( new String(), new String() );
		++testCounter; // 2
		assert.strictEqual( hashtable1.count, 1 );
		++testCounter; // 3
		assert.strictEqual( hashtable2.count, 0 );
		hashtable2.add( new String(), new String() );
		hashtable2.add( new String( '1' ), new String() );
		++testCounter; // 4
		assert.strictEqual( hashtable2.count, 2 );

		return true;
	}
	catch ( error )
	{
		console.error( 'Hashtable.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
