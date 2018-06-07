/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Enum from './Enum';
import Type from '../Type';

/**
 * Provides the type of basic objects.
 * @extends Enum
 */
export class TypeCodes extends Enum
{
	//////
	//
	//  Static Properties
	//
	//////

	/**
	 * The null type representing the null reference.
	 */
	public static readonly EMPTY = new TypeCodes( 'EMPTY', 0 );

	/**
	 * The boolean type representing boolean based value types.
	 */
	public static readonly BOOLEAN = new TypeCodes( 'BOOLEAN', 3 );

	/**
	 * The number type representing number based value types.
	 */
	public static readonly NUMBER = new TypeCodes( 'NUMBER', 14 );

	/**
	 * The string type representing string based value types.
	 */
	public static readonly STRING = new TypeCodes( 'STRING', 18 );

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type of the enum for further reflection.
	 * @return {Type} Returns the type of this enum.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default TypeCodes;
