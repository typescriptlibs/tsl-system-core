import * as assert from 'assert';
import
{
	Boolean,
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;

	try
	{
		let booleanFalse = new Boolean( false );
		let booleanTrue = new Boolean( true );

		// FALSE
		++testCounter; // 1
		assert.strictEqual( Boolean.FALSE.valueOf(), false );
		++testCounter; // 2
		assert.strictEqual( booleanFalse, Boolean.FALSE );

		// TRUE
		++testCounter; // 3
		assert.strictEqual( Boolean.TRUE.valueOf(), true );
		++testCounter; // 4
		assert.strictEqual( booleanTrue, Boolean.TRUE );

		// equals
		++testCounter; // 5
		assert.strictEqual( booleanFalse.equals( Boolean.FALSE ), true );
		++testCounter; // 6
		assert.strictEqual( booleanFalse.equals( new Boolean( false ) ), true );
		++testCounter; // 7
		assert.strictEqual( booleanTrue.equals( Boolean.TRUE ), true );
		++testCounter; // 8
		assert.strictEqual( booleanTrue.equals( new Boolean( true ) ), true );
		++testCounter; // 9
		assert.strictEqual( booleanFalse.equals( Boolean.TRUE ), false );
		++testCounter; // 10
		assert.strictEqual( booleanFalse.equals( new Boolean( true ) ), false );
		++testCounter; // 11
		assert.strictEqual( booleanTrue.equals( Boolean.FALSE ), false );
		++testCounter; // 12
		assert.strictEqual( booleanTrue.equals( new Boolean( false ) ), false );

		// getHashCode
		++testCounter; // 13
		assert.strictEqual( booleanFalse.getHashCode(), Boolean.FALSE.getHashCode() );
		++testCounter; // 14
		assert.strictEqual( booleanFalse.getHashCode(), ( new Boolean( false ) ).getHashCode() );
		++testCounter; // 15
		assert.strictEqual( booleanTrue.getHashCode(), Boolean.TRUE.getHashCode() );
		++testCounter; // 16
		assert.strictEqual( booleanTrue.getHashCode(), ( new Boolean( true ) ).getHashCode() );
		++testCounter; // 17
		assert.notEqual( booleanFalse.getHashCode(), Boolean.TRUE.getHashCode() );
		++testCounter; // 18
		assert.notEqual( booleanFalse.getHashCode(), ( new Boolean( true ) ).getHashCode() );
		++testCounter; // 19
		assert.notEqual( booleanTrue.getHashCode(), Boolean.FALSE.getHashCode() );
		++testCounter; // 20
		assert.notEqual( booleanTrue.getHashCode(), ( new Boolean( false ) ).getHashCode() );

		// getType
		++testCounter; // 21
		assert.deepStrictEqual( booleanFalse.getType().classConstructor, Boolean );
		++testCounter; // 22
		assert.deepStrictEqual( booleanTrue.getType().classConstructor, Boolean );
		++testCounter; // 23
		assert.strictEqual( booleanFalse.getType().fullName, 'tsl-system-core.Boolean' );
		++testCounter; // 24
		assert.strictEqual( booleanTrue.getType().fullName, 'tsl-system-core.Boolean' );
		++testCounter; // 25
		assert.strictEqual( booleanFalse.getType().name, 'Boolean' );
		++testCounter; // 26
		assert.strictEqual( booleanTrue.getType().name, 'Boolean' );
		++testCounter; // 27
		assert.strictEqual( booleanFalse.getType().packageName, 'tsl-system-core' );
		++testCounter; // 28
		assert.strictEqual( booleanTrue.getType().packageName, 'tsl-system-core' );

		// toString
		++testCounter; // 29
		assert.strictEqual( booleanFalse.toString(), 'false' );
		++testCounter; // 30
		assert.strictEqual( booleanTrue.toString(), 'true' );

		// valueOf
		++testCounter; // 31
		assert.strictEqual( booleanFalse.valueOf(), false );
		++testCounter; // 32
		assert.strictEqual( booleanTrue.valueOf(), true );
		++testCounter; // 33
		assert.notEqual( booleanFalse.valueOf(), true );
		++testCounter; // 34
		assert.notEqual( booleanTrue.valueOf(), false );

		return true;
	}
	catch ( error )
	{
		console.error( 'Boolean.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
