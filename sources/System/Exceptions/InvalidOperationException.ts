/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import SystemException from './SystemException';
import Type from '../Type';

/**
 * The InvalidOperationException will be thrown, when the function call is not
 * valid in the current state of the class object.
 *
 * @extends SystemException
 */
export class InvalidOperationException extends SystemException
{
	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of this InvalidOperationException for further
	 * reflection.
	 *
	 * @return {Type}
	 * The type of this InvalidOperationException.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default InvalidOperationException;
