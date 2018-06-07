import * as assert from 'assert';
import
{
	RuntimeUtility
}
	from 'tsl-system-core';

export default function (): boolean
{
	try
	{
		// generateUniqueHashCode
		assert.ok(( RuntimeUtility.generateUniqueHashCode() < RuntimeUtility.generateUniqueHashCode() ),
			'RuntimeUtility.generateUniqueHashCode() < RuntimeUtility.generateUniqueHashCode()'
		);

		return true;
	}
	catch ( error )
	{
		console.error( 'RuntimeUtility.test failed (' + error + ')\n' + error.stack );
		return false;
	}
}