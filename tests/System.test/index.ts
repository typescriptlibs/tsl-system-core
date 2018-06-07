import * as assert from 'assert';
import Object_test from './Object.test';
import Type_test from './Type.test';
import Collections_test from './Collections.test';
import Exceptions_test from './Exceptions.test';
import Primitives_test from './Primitives.test';
import Runtime_test from './Runtime.test';

export default function (): boolean
{
	try
	{
		assert.ok( Object_test(), 'Core.test' ); // #1
		assert.ok( Type_test(), 'Type.test' ); // #2
		assert.ok( Collections_test(), 'Collections.test' );
		assert.ok( Exceptions_test(), 'Exceptions.test' );
		assert.ok( Primitives_test(), 'Primitives.test' );
		assert.ok( Runtime_test(), 'Runtime.test' );
		return true;
	}
	catch ( error )
	{
		console.error( 'System.test failed (' + error + ')' );
		return false;
	}
}
