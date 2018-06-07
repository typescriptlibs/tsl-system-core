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
 *
 * @extends ValueType
 */
export class Boolean extends ValueType<boolean>
{
	//////
	//
	//  Constants
	//
	//////

	public static readonly FALSE = new Boolean( false );
	public static readonly TRUE = new Boolean( true );

	/**
	 * Initialize the boolean with a provided primitive value.
	 * @param {boolean|ValueType} value The primitive value of this boolean.
	 */
	public constructor( value?: ( boolean | ValueType<boolean> ) )
	{
		super( value );

		if ( value === undefined )
		{
			value = false;
		}

		if ( value instanceof ValueType )
		{
			value = value.valueOf();
		}

		if ( value === false
			&& Boolean.FALSE instanceof Boolean )
		{
			return Boolean.FALSE;
		}
		else if ( value === true
			&& Boolean.TRUE instanceof Boolean )
		{
			return Boolean.TRUE;
		}
	}

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Filters the boolean value at initialization.
	 * @param {boolean|ValueType|undefined} value The provided boolean value.
	 * @return {boolean} The filtered boolean value.
	 */
	protected filter( value: ( boolean | ValueType<boolean> | undefined ) ): boolean
	{
		return ( value ? value.valueOf() : false );
	}

	/**
	 * Returns the type of this boolean for further reflection.
	 * @return {Type} The type of this boolean.
	 */
	public getType(): Type
	{
		return new Type( this, packageMetaData );
	}
}

export default Boolean;
