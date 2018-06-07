import * as assert from 'assert';
import
{
	Boolean,
	String,
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;

	try
	{
		let string1 = new String( '1' );
		let string2 = new String( '2' );

		// EMPTY
		++testCounter; // 1
		assert.strictEqual( +new String(), +String.EMPTY );
		++testCounter; // 2
		assert.strictEqual( +new String( '' ), +String.EMPTY );
		++testCounter; // 3
		assert.notStrictEqual( +string1, +String.EMPTY );

		// endsWith
		++testCounter; // 4
		assert.strictEqual( string1.endsWith( String.EMPTY ), Boolean.TRUE );
		++testCounter; // 5
		assert.strictEqual( string1.endsWith( '1' ), Boolean.TRUE );
		++testCounter; // 6
		assert.strictEqual( string1.endsWith( string1 ), Boolean.TRUE );
		++testCounter; // 7
		assert.strictEqual( string1.endsWith( '3' ), Boolean.FALSE );
		++testCounter; // 8
		assert.strictEqual( string1.endsWith( string2 ), Boolean.FALSE );

		// equals
		++testCounter; // 9
		assert.strictEqual( string1.equals( '1' ), true );
		++testCounter; // 10
		assert.strictEqual( string1.equals( new String( '1' ) ), true );

		return true;
	}
	catch ( error )
	{
		console.error( 'String.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
