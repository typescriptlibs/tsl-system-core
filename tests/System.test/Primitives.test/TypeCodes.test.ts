import * as assert from 'assert';
import
{
	TypeCodes,
}
	from 'tsl-system-core';

export default function (): boolean
{
	try
	{
		// getType
		assert.strictEqual( TypeCodes.BOOLEAN.getType().fullName, 'tsl-system-core.TypeCodes',
			'TypeCodes.BOOLEAN.getType().fullName === \'tsl-system-core.TypeCodes\' : ' + ( TypeCodes.BOOLEAN.getType().fullName + ' === tsl-system-core.TypeCodes' )
		);
		assert.strictEqual( TypeCodes.EMPTY.getType().fullName, 'tsl-system-core.TypeCodes',
			'TypeCodes.EMPTY.getType().fullName === \'tsl-system-core.TypeCodes\' : ' + ( TypeCodes.EMPTY.getType().fullName + ' === tsl-system-core.TypeCodes' )
		);
		assert.strictEqual( TypeCodes.NUMBER.getType().fullName, 'tsl-system-core.TypeCodes',
			'TypeCodes.NUMBER.getType().fullName === \'tsl-system-core.TypeCodes\' : ' + ( TypeCodes.NUMBER.getType().fullName + ' === tsl-system-core.TypeCodes' )
		);
		assert.strictEqual( TypeCodes.STRING.getType().fullName, 'tsl-system-core.TypeCodes',
			'TypeCodes.STRING.getType().fullName === \'tsl-system-core.TypeCodes\' : ' + ( TypeCodes.STRING.getType().fullName + ' === tsl-system-core.TypeCodes' )
		);

		// toString
		assert.strictEqual( TypeCodes.BOOLEAN.toString(), 'BOOLEAN',
			'TypeCodes.BOOLEAN.toString() === \'BOOLEAN\' : ' + ( TypeCodes.BOOLEAN.toString() + ' === BOOLEAN' )
		);
		assert.strictEqual( TypeCodes.EMPTY.toString(), 'EMPTY',
			'TypeCodes.EMPTY.toString() === \'EMPTY\' : ' + ( TypeCodes.EMPTY.toString() + ' === EMPTY' )
		);
		assert.strictEqual( TypeCodes.NUMBER.toString(), 'NUMBER',
			'TypeCodes.NUMBER.toString() === \'NUMBER\' : ' + ( TypeCodes.NUMBER.toString() + ' === NUMBER' )
		);
		assert.strictEqual( TypeCodes.STRING.toString(), 'STRING',
			'TypeCodes.STRING.toString() === \'STRING\' : ' + ( TypeCodes.STRING.toString() + ' === STRING' )
		);

		// valueOf
		assert.strictEqual( TypeCodes.BOOLEAN.valueOf(), 3,
			'TypeCodes.BOOLEAN.valueOf() === 3 : ' + ( TypeCodes.BOOLEAN.valueOf() + ' === 3' )
		);
		assert.strictEqual( TypeCodes.EMPTY.valueOf(), 0,
			'TypeCodes.EMPTY.valueOf() === 0 : ' + ( TypeCodes.EMPTY.valueOf() + ' === 0' )
		);
		assert.strictEqual( TypeCodes.NUMBER.valueOf(), 14,
			'TypeCodes.NUMBER.valueOf() === 14 : ' + ( TypeCodes.NUMBER.valueOf() + ' === 14' )
		);
		assert.strictEqual( TypeCodes.STRING.valueOf(), 18,
			'TypeCodes.STRING.valueOf() === 18 : ' + ( TypeCodes.STRING.valueOf() + ' === 18' )
		);

		return true;
	}
	catch ( error )
	{
		console.error( 'TypeCode_test failed (' + error + ')\n' + error.stack );
		return false;
	}
}
