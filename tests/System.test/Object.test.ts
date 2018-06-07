import * as assert from 'assert';
import
{
	Object
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;

	try
	{
		let object1 = new Object();
		let object2 = new Object();

		// equals
		++testCounter; // 1
		assert.strictEqual( object1.equals( object1 ), true );
		++testCounter; // 2
		assert.strictEqual( object2.equals( object2 ), true );
		++testCounter; // 3
		assert.strictEqual( object1.equals( object2 ), false );
		++testCounter; // 4
		assert.strictEqual( object2.equals( object1 ), false );

		// getHashCode
		++testCounter; // 5
		assert.strictEqual( object1.getHashCode(), object1.getHashCode() );
		++testCounter; // 6
		assert.strictEqual( object2.getHashCode(), object2.getHashCode() );
		++testCounter; // 7
		assert.notEqual( object1.getHashCode(), object2.getHashCode() );
		++testCounter; // 8
		assert.ok( object1.getHashCode() < object2.getHashCode() );

		// getType
		++testCounter; // 9
		assert.strictEqual( object1.getType().valueOf(), 'tsl-system-core.Object' );
		++testCounter; // 10
		assert.strictEqual( object2.getType().valueOf(), 'tsl-system-core.Object' );
		++testCounter; // 11
		assert.strictEqual( object1.getType().valueOf(), object2.getType().valueOf() );

		// toString
		++testCounter; // 12
		assert.strictEqual( object1.toString(), 'tsl-system-core.Object' );
		++testCounter; // 13
		assert.strictEqual( object2.toString(), 'tsl-system-core.Object' );
		++testCounter; // 14
		assert.strictEqual( object1.toString(), object2.toString() );

		// valueOf
		++testCounter; // 15
		assert.strictEqual( object1.valueOf(), object1.valueOf() );
		++testCounter; // 16
		assert.strictEqual( object2.valueOf(), object2.valueOf() );
		++testCounter; // 17
		assert.notEqual( object1.valueOf(), object2.valueOf() );
		++testCounter; // 18
		assert.notStrictEqual( object1.valueOf(), object2.valueOf() );
		++testCounter; // 19
		assert.ok( object1 === object1 );
		++testCounter; // 20
		assert.ok( object2 === object2 );
		++testCounter; // 21
		assert.ok( object1 !== object2 );

		return true;
	}
	catch ( error )
	{
		console.error( 'Object.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}