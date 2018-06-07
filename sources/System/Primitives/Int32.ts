/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Type from '../Type';
import ValueType from './ValueType';

/**
 * Represents 32 bit integer.
 * @extends ValueType
 */
export class Int32 extends ValueType<number>
{
	//////
	//
	//  Constants
	//
	//////

	public static readonly MAX_VALUE = new Int32( 0x7FFFFFFF );
	public static readonly MIN_VALUE = new Int32( 0xFFFFFFFF );
	public static readonly MINUS = new Int32();
	public static readonly NULL = new Int32();

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Filters the number value at initialization.
	 * @param {number|ValueType|undefined} value The provided number value.
	 * @return {number} The filtered number value.
	 */
	protected filter( value: ( number | ValueType<number> | undefined ) ): number
	{
		if ( value === undefined )
		{
			return 0;
		}

		if ( value instanceof ValueType )
		{
			value = value.valueOf();
		}

		if ( value < 0 )
		{
			return ( value & 0xFFFFFFFF );
		}
		else
		{
			return ( value & 0x7FFFFFFF );
		}
	}

	/**
	 * Returns the type of the integer for further reflection.
	 * @return {Type} Returns the type of this integer.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default Int32;
