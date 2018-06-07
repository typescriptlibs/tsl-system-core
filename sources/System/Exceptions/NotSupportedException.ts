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
 * The NotSupportedException will be thrown, when a function is not supported
 * by the class implementation.
 *
 * @extends SystemException
 */
export class NotSupportedException extends SystemException
{
	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of this NotSupportedException for further reflection.
	 *
	 * @return {Type}
	 * The type of this NotSupportedException.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default NotSupportedException;
