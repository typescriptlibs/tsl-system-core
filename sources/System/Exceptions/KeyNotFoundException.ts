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
 * The KeyNotFoundException will be thrown, when a specified key does not match
 * any key of a ICollection.
 *
 * @extends SystemException
 */
export class KeyNotFoundException extends SystemException
{
	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of this KeyNotFoundException for further reflection.
	 *
	 * @return {Type}
	 * The type of this NotSupportedException.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default KeyNotFoundException;
