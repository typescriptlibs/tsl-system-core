/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import Environment from '../Runtime/Environment';
import Object from '../Object';
import Type from '../Type';
import ValueType from './ValueType';

/**
 * This is the base class for enumerations.
 * @extends ValueType
 */
export abstract class Enum extends ValueType<( boolean | number | string )>
{
	//////
	//
	//  Constructor
	//
	//////

	/**
	 * Creates a new member for enumerations.
	 * @param {string} name The name of the member in the enumeration.
	 * @param {boolean|number|string|ValueType} value The value of the member in the enumeration.
	 */
	public constructor( name: string, value: ( boolean | number | string | ValueType<( boolean | number | string )> ) )
	{
		super( value );

		this._name = name;
	}

	//////
	//
	//  Properties
	//
	//////

	private _name: string;

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Compares this enum with an other object for equality.
	 * @param {Enum|Object} other The object to compare with.
	 * @return {boolean} Returns true, if the objects are equal, otherwise false.
	 */
	public equals( other: ( Enum | Object ) ): boolean
	{
		return (
			other instanceof Enum
			&& other._name === this._name
			&& super.equals( other )
		);
	}

	/**
	 * Filters the primitive value at initialization.
	 * @param {boolean|number|string|ValueType|undefined} value The provided primitive value.
	 * @return {boolean|number|string} The filter primitive value.
	 */
	protected filter( value?: ( boolean | number | string | ValueType<( boolean | number | string )> | undefined ) ): ( boolean | number | string )
	{
		if ( value === undefined )
		{
			return Environment.ESOBJECT.keys( this.constructor ).length as any;
		}

		if ( value instanceof ValueType )
		{
			value = value.valueOf();
		}

		return value;
	}

	/**
	 * Returns the type of an enum for further reflection. Must be
	 * overwritten by every enum.
	 * @return {Type} Returns the type of this enum.
	 */
	public abstract getType(): Type;

	/**
	 * Returns the name of this enum object.
	 * @return {string} The name of this enum object.
	 */
	public toString(): string
	{
		return this._name;
	}
}

export default Enum;
