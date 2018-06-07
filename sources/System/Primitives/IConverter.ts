/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import Object from '../Object';
import Type from '../Type';
import TypeCodes from './TypeCodes';
import ValueType from './ValueType';

/**
 * Provides functions to convert primitive value types.
 * @extends Object
 */
export interface IConverter<T extends ( ValueType<boolean> | ValueType<number> | ValueType<string> )> extends Object
{
	//////
	//
	//  Functions
	//
	//////

	/**
	 * Returns the type code for this converter.
	 * @returns {TypeCodes} The type code of this object.
	 */
	getTypeCode(): TypeCodes;

	/**
	 * Converts a provided value type to a boolean.
	 * @returns {boolean} The boolean equivalent of the value type.
	 */
	toPrimitiveBoolean( value: T ): boolean;

	/**
	 * Converts a provided value type to a boolean.
	 * @returns {number} The boolean equivalent of the value type.
	 */
	toPrimitiveNumber( value: T ): number;

	/**
	 * Converts a provided value type to a string.
	 * @returns {string} The string equivalent of this object.
	 */
	toPrimitiveString( value: T ): string;

	/**
	 * Coverts a provided value type to this converters value type
	 * @returns {ValueType} The string equivalent of this object.
	 */
	convert<TReturn extends ( ValueType<boolean> | ValueType<number> | ValueType<string> )>( value: T, returnType: Type ): TReturn;
}

export default IConverter;
