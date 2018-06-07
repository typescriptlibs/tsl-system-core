/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Environment from '../Runtime/Environment';
import Type from '../Type';
import ValueType from './ValueType';

/**
 * Represents a character as a UTF-32 code unit.
 * @extends ValueType
 */
export class Char extends ValueType<number>
{
	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Converts the first element of the string into a char.
	 * @param {string} charString The provided string for conversion.
	 * @return {Char} The resulting char after conversion.
	 */
	public static tryParse( charString: string ): Char
	{
		if ( charString.length == 0 )
		{
			return new Char();
		}

		let firstChar = charString.charCodeAt( 0 );

		if ( charString.length == 1
			|| firstChar < 0xD800
			|| firstChar > 0xDBFF )
		{
			return new Char( firstChar );
		}

		let secondChar = charString.charCodeAt( 1 );

		if ( secondChar < 0xDC00
			|| secondChar > 0xDFFF )
		{
			return new Char( 0xFFFD );
		}

		return new Char( 0x10000 + ( ( firstChar - 0xD800 ) * 0x400 ) + ( secondChar - 0xDC00 ) );
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Filters the primitive value at initialization.
	 * @param {number|ValueType|undefined} value The provided number.
	 * @return {number} The filtered number.
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

		if ( value < 0
			|| value == 0xFFFE
			|| value == 0xFFFF
			|| value > 0x10FFFF )
		{
			return 0xFFFD;
		}
		else
		{
			return value;
		}
	}

	/**
	 * Returns the type of the char for further reflection.
	 * @return {Type} Returns the type of this char.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Converts the char to a string.
	 * @returns {string} The string equivalent of this char.
	 */
	toString(): string
	{
		let value = this.valueOf();

		if ( value < 0x10000 )
		{
			return Environment.ESSTRING.fromCharCode( value );
		}

		value = ( value - 0x10000 );

		return Environment.ESSTRING.fromCharCode( ( ( value >> 10 ) + 0xD800 ), ( ( value % 0x400 ) + 0xDC00 ) );
	}
}

export default Char;
