import * as assert from 'assert';
import System_test from './System.test';

try
{
	assert.ok( System_test(), 'System.test' );
	console.log( 'Tests successfull' );
}
catch ( error )
{
	console.error( 'Tests failed (' + error + ')' );
}
