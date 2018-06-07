/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import packageMetaData from '../package';
import Environment from './Runtime/Environment';
import RuntimeUtility from './Runtime/RuntimeUtility';
import { Type } from './';

/**
 * The base class for all other classes.
 */
class _Object_ extends Environment.ESOBJECT
{
	//////
	//
	//  Properties
	//
	//////

	private _hashCode_: ( number | undefined ) = undefined;

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Compares this object with an other object for equality.
	 *
	 * @param {Object} other
	 * The object to compare with.
	 *
	 * @return {boolean|any}
	 * True, if the objects are equal, otherwise false.
	 */
	public equals( other: _Object_ ): boolean
	{
		return (
			other != null
			&& other.getHashCode() === this.getHashCode()
			&& other.getType().equals( this.getType() )
			&& other.valueOf() === this.valueOf()
		);
	}

	/**
	 * Generates or returns a unique code for this object. Should be
	 * overwritten by value based classes.
	 *
	 * @return {number}
	 * The unique code for this object.
	 */
	public getHashCode(): number
	{
		if ( this._hashCode_ === undefined )
		{
			this._hashCode_ = RuntimeUtility.generateUniqueHashCode();
		}

		return this._hashCode_;
	}

	/**
	 * Returns the type of an object for further reflection. Must be
	 * overwritten by every class.
	 *
	 * @return {Type}
	 * The type of this object.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}

	/**
	 * Returns the class name as the default string representation of an
	 * object. Must be overwritten by value based classes.
	 *
	 * @return {string}
	 * The string representation of this object.
	 */
	public toString(): string
	{
		return this.getType().toString();
	}

	/**
	 * Returns the primitive value of an object. Must be overwritten by value
	 * based classes.
	 *
	 * @return {boolean|number|string}
	 * The primitive value of this object.
	 */
	public valueOf(): ( boolean | number | string )
	{
		return this.getHashCode();
	}
}

export default _Object_;
