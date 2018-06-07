/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../../package';
import Char from './Char';
import Type from '../Type';
import ValueType from './ValueType';

/**
 * The string class represent a text string and provides functions for
 * analysation and manipulation.
 *
 * @extends ValueType
 */
export class String extends ValueType<string>
{
	//////
	//
	//  Constants
	//
	//////

	/**
	 * Represents an empty string.
	 */
	public static readonly EMPTY: String = new String();

	//////
	//
	//  Properties
	//
	//////

	private _chars: ( Char[] | undefined ) = undefined;
	private _length: ( number | undefined ) = undefined;

	/**
	 * Provides access to the unicode chars of this string.
	 */
	public get chars(): Char[]
	{
		if ( this._chars === undefined )
		{
			let newChars = [] as Char[];

			this.valueOf().split( UNICODE_REGEXP ).forEach(
				( charString ) =>
				{
					newChars.push( Char.tryParse( charString ) );
				}
			);

			this._chars = newChars;
		}

		return this._chars;
	}

	/**
	 * The length of this text string.
	 */
	public get length(): number
	{
		if ( this._length === undefined )
		{
			this._length = this.valueOf().replace( UNICODE_REGEXP, '_' ).length;
		}

		return this._length;
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Determines whether the ending of this text string matches the provided
	 * string value.
	 *
	 * @param {string|String} other
	 * The provided string to compare with this text string.
	 *
	 * @returns {boolean}
	 * True if this text string ends with the provided value, otherwise false.
	 */
	public endsWith( other: ( string | String ) ): boolean
	{
		other = other.toString();

		if ( other == '' )
		{
			return true;
		}

		let rawValue = this.valueOf();
		let index = rawValue.lastIndexOf( other );

		return (
			index >= 0
			&& index == ( rawValue.length - other.length )
		);
	}

	/**
	 * Compares this string with an other string for equality.
	 *
	 * @param {string|String|Object} other
	 * The object to compare with.
	 *
	 * @return {boolean}
	 * True, if the objects are equal, otherwise false.
	 */
	public equals( other: ( string | String | Object ) ): boolean
	{
		if ( typeof other == 'string' )
		{
			return ( other === this.valueOf() );
		}
		else
		{
			return (
				other instanceof ValueType
				&& other.valueOf() == this.valueOf()
				&& other.getType().equals( this.getType() )
			);
		}
	}

	/**
	 * Filters the primitive value at initialization.
	 *
	 * @param {string} value
	 * The provided primitive value.
	 *
	 * @return {string}
	 * The filtered primitive value.
	 */
	protected filter( value: ( string | undefined ) ): string
	{
		return ( value ? value.toString() : '' );
	}

	/**
	 * Returns the type of the string for further reflection.
	 *
	 * @return {Type}
	 * The type of this string.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Determines whether the beginning of this text string matches the
	 * provided string value.
	 *
	 * @param {string|String} other
	 * The provided string to compare with this text string.
	 *
	 * @return {boolean}
	 * True if this text string begins with the provided value, otherwise
	 * false.
	 */
	public startsWith( other: ( string | String ) ): boolean
	{
		other = other.toString();

		return (
			other == ''
			|| this.valueOf().indexOf( other ) == 0 );
	}

	/**
	 * Returns the native object without any conversion.
	 *
	 * @return {string}
	 * The native object without any conversion.
	 */
	public toString(): string
	{
		return this.valueOf();
	}
}

export default String;

const UNICODE_REGEXP = new RegExp( '[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\s\S]', 'g' );
