import * as assert from 'assert';
import Boolean_test from './Boolean.test';
import String_test from './String.test';
import TypeCodes_test from './TypeCodes.test';

export default function (): boolean
{
	try
	{
		assert.ok( Boolean_test(), 'Boolean.test' );
		assert.ok( String_test(), 'String.test' );
		assert.ok( TypeCodes_test(), 'TypeCodes.test' );
		return true;
	}
	catch ( error )
	{
		console.error( 'Primitives.test failed (' + error + ')' );
		return false;
	}
}
