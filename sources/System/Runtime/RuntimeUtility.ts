/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

/**
 * Provides special functions for the run time.
 */
export module RuntimeUtility
{
	//////
	//
	//  Constants
	//
	//////

	/**
	 * The largest integer float number that can be used without precision
	 * problems in every ECMAScript runtime.
	 */
	export const MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;

	/**
	 * The lowest integer float number that can be used without precision
	 * problems in every ECMAScript runtime.
	 */
	export const MIN_SAFE_INTEGER = -0x1FFFFFFFFFFFFF;

	//////
	//
	//  Properties
	//
	//////

	let generatedStringHashCodeSalt: number = ( 1 + ( Math.random() * ( MAX_SAFE_INTEGER - 1 ) ) );
	let generatedUniqueHashCodeCounter: number = MIN_SAFE_INTEGER;

	//////
	//
	//  Functions
	//
	//////

	/**
	 * Generates unique codes for strings. This code is only unique for the
	 * current runtime session.
	 *
	 * @param {string} str
	 * The string to generate the unique code of.
	 *
	 * @returns {number}
	 * The hash code of the string.
	 */
	export function generateStringHashCode( str: string ): number
	{
		let hash1 = 5381;
		let hash2 = hash1;
		let len = str.length;

		while ( len > 2 )
		{
			hash1 = ( ( hash1 << 5 ) + hash1 + ( hash1 >> 27 ) ) ^ str.charCodeAt( len - 1 );
			hash2 = ( ( hash2 << 5 ) + hash2 + ( hash2 >> 27 ) ) ^ str.charCodeAt( len - 2 );
			len -= 2;
		}

		if ( len > 0 )
		{
			hash1 = ( ( hash1 << 5 ) + hash1 + ( hash1 >> 27 ) ) ^ str.charCodeAt( len - 1 );
		}

		hash1 ^= generatedStringHashCodeSalt;

		return ( hash1 + ( hash2 * 1566083941 ) );
	}

	/**
	 * Generates unique codes for objects. This code is only unique for the
	 * current runtime session.
	 *
	 * @returns {number}
	 * The unique hash code for an object.
	 */
	export function generateUniqueHashCode(): number
	{
		return ++generatedUniqueHashCodeCounter;
	}
}

export default RuntimeUtility;
