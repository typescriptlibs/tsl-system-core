/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import ArgumentException from './ArgumentException';
import Type from '../Type';

/**
 * The ArgumentNullException will be thrown, when an argument with a invalid
 * null reference has been provided to the function.
 *
 * @extends ArgumentException
 */
export class ArgumentNullException extends ArgumentException
{
	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of this object for further reflection.
	 * @return {Type} The type of this object.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default ArgumentNullException;
