import * as assert from 'assert';
import
{
	TypeCodes,
}
	from 'tsl-system-core';

export default function (): boolean
{
	let testCounter = 0;
	try
	{
		// getType
		++testCounter; // 1
		assert.strictEqual( TypeCodes.BOOLEAN.getType().fullName, 'tsl-system-core.TypeCodes' );
		++testCounter; // 2
		assert.strictEqual( TypeCodes.EMPTY.getType().fullName, 'tsl-system-core.TypeCodes' );
		++testCounter; // 3
		assert.strictEqual( TypeCodes.NUMBER.getType().fullName, 'tsl-system-core.TypeCodes' );
		++testCounter; // 4
		assert.strictEqual( TypeCodes.STRING.getType().fullName, 'tsl-system-core.TypeCodes' );

		// toString
		++testCounter; // 5
		assert.strictEqual( TypeCodes.BOOLEAN.toString(), 'BOOLEAN' );
		++testCounter; // 6
		assert.strictEqual( TypeCodes.EMPTY.toString(), 'EMPTY' );
		++testCounter; // 7
		assert.strictEqual( TypeCodes.NUMBER.toString(), 'NUMBER' );
		++testCounter; // 8
		assert.strictEqual( TypeCodes.STRING.toString(), 'STRING' );

		// valueOf
		++testCounter; // 9
		assert.strictEqual( TypeCodes.BOOLEAN.valueOf(), 3 );
		++testCounter; // 10
		assert.strictEqual( TypeCodes.EMPTY.valueOf(), 0 );
		++testCounter; // 11
		assert.strictEqual( TypeCodes.NUMBER.valueOf(), 14 );
		++testCounter; // 12
		assert.strictEqual( TypeCodes.STRING.valueOf(), 18 );

		return true;
	}
	catch ( error )
	{
		console.error( 'TypeCodes.test #' + testCounter + ' failed (' + error + ')' );
		return false;
	}
}
