import * as assert from 'assert';
import
{
	Object,
	String,
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;

	try
	{
		let objectType = ( new Object() ).getType();
		let stringType = ( new String() ).getType();

		// classConstructor
		++testCounter; // 1
		assert.deepStrictEqual( objectType.classConstructor, Object );
		++testCounter; // 2
		assert.deepStrictEqual( stringType.classConstructor, String );
		++testCounter; // 3
		assert.notEqual( objectType.classConstructor, String );
		++testCounter; // 4
		assert.notEqual( stringType.classConstructor, Object );

		// fullName
		++testCounter; // 5
		assert.strictEqual( objectType.fullName, 'tsl-system-core.Object' );
		++testCounter; // 6
		assert.strictEqual( stringType.fullName, 'tsl-system-core.String' );
		++testCounter; // 7
		assert.notEqual( objectType.fullName, stringType.fullName );

		// name
		++testCounter; // 8
		assert.strictEqual( objectType.name, 'Object' );
		++testCounter; // 9
		assert.strictEqual( stringType.name, 'String' );
		++testCounter; // 10
		assert.notEqual( objectType.name, stringType.name );

		// packageName
		++testCounter; // 11
		assert.strictEqual( objectType.packageName, 'tsl-system-core' );
		++testCounter; // 12
		assert.strictEqual( stringType.packageName, 'tsl-system-core' );
		++testCounter; // 13
		assert.strictEqual( objectType.packageName, stringType.packageName );

		// equals
		++testCounter; // 14
		assert.strictEqual( objectType.equals( objectType ), true );
		++testCounter; // 15
		assert.strictEqual( stringType.equals( stringType ), true );
		++testCounter; // 16
		assert.strictEqual( objectType.equals( stringType ), false );

		// getHashCode
		++testCounter; // 17
		assert.strictEqual( objectType.getHashCode(), objectType.getHashCode() );
		++testCounter; // 18
		assert.strictEqual( stringType.getHashCode(), stringType.getHashCode() );
		++testCounter; // 19
		assert.notEqual( objectType.getHashCode(), stringType.getHashCode() );
		++testCounter; // 20
		assert.notStrictEqual( objectType.getHashCode(), stringType.getHashCode() );

		// getType
		++testCounter; // 21
		assert.strictEqual( objectType.getType(), objectType );
		++testCounter; // 22
		assert.strictEqual( stringType.getType(), stringType );
		++testCounter; // 23
		assert.notStrictEqual( objectType.getType(), stringType );
		++testCounter; // 24
		assert.notStrictEqual( stringType.getType(), objectType );

		// toString
		++testCounter; // 25
		assert.strictEqual( objectType.toString(), 'tsl-system-core.Object' );
		++testCounter; // 26
		assert.strictEqual( stringType.toString(), 'tsl-system-core.String' );

		// valueOf
		++testCounter; // 27
		assert.strictEqual( objectType.valueOf(), objectType.valueOf() );
		++testCounter; // 28
		assert.strictEqual( stringType.valueOf(), stringType.valueOf() );
		++testCounter; // 29
		assert.notEqual( objectType.valueOf(), stringType.valueOf() );
		++testCounter; // 30
		assert.ok( objectType === objectType );
		++testCounter; // 31
		assert.ok( stringType === stringType );
		++testCounter; // 32
		assert.ok( objectType !== stringType );

		return true;
	}
	catch ( error )
	{
		console.error( 'Type.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
