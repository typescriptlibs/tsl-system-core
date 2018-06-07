/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import Object from '../Object';
import RuntimeUtility from '../Runtime/RuntimeUtility';
import Type from '../Type';

export abstract class ValueType<T extends ( boolean | number | string )> extends Object
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Initialize the value type with a provided primitive value.
	 * @param {boolean|number|string|ValueType|undefined} values The primitive value of this value type.
	 */
	public constructor( value?: ( T | ValueType<T> ) )
	{
		super();

		this._value = this.filter( value );
	}

	//////
	//
	//  Virtual Properties
	//
	//////

	private _hashCode: ( number | undefined );
	private _value: T;

	//////
	//
	//  Abstract Functions
	//
	//////

	/**
	 * Filters the primitive value at initialization.
	 * @param {boolean|number|string|ValueType|undefined} value The provided primitive value.
	 * @return {boolean|number|string} The filtered primitive value.
	 */
	protected abstract filter( value: ( T | ValueType<T> | undefined ) ): T;

	/**
	 * Returns the type of this value type for further reflection.
	 * @return {Type} The type of this value type.
	 */
	public abstract getType(): Type;

	//////
	//
	//  Virtual Functions
	//
	//////

	/**
	 * Compares this value type with an other object for equality.
	 * @param {ValueType|Object} other The object to compare with.
	 * @return {boolean} True, if the objects are equal, otherwise false.
	 */
	public equals( other: ( ValueType<T> | Object ) ): boolean
	{
		return (
			other instanceof ValueType
			&& other.valueOf() == this.valueOf()
			&& other.getType().equals( this.getType() )
		);
	}

	/**
	 * Generates a unique code for this value type.
	 * @return {number} Returns the unique code for this value type.
	 */
	public getHashCode(): number
	{
		if ( this._hashCode === undefined )
		{
			let value = this.valueOf();

			switch ( typeof value )
			{
				case 'boolean':
					this._hashCode = ( value === true ? 1 : 0 );
					break;
				case 'number':
					this._hashCode = ( value as number );
					break;
				default:
					this._hashCode = RuntimeUtility.generateStringHashCode( value as string );
					break;
			}
		}

		return this._hashCode;
	}

	/**
	 * Returns the string representation of this value type.
	 * @return {string} The string representation of this value type.
	 */
	public toString(): string
	{
		return this.valueOf().toString();
	}

	/**
	 * Returns the primitive value of this value type.
	 * @return {boolean|number|string} The primitive value of this value type.
	 */
	public valueOf(): T
	{
		return this._value;
	}
}

export default ValueType;
