/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

/**
 * Provides information and functions for the current process and runtime.
 */
export module Environment
{
	//////
	//
	//  Constants
	//
	//////

	/**
	 * The global base object at runtime.
	 */
	export const ESOBJECT: typeof Object = Object;

	/**
	 * The global string object at runtime.
	 */
	export const ESSTRING: typeof String = String;

	/**
	 * The newline string for this environment.
	 */
	export const NEWLINE: string = '\n';

	/**
	 * Every newline string of possible environments.
	 */
	export const NEWLINE_ALL: string[] = ['\n', '\r', '\r\n'];

	/**
	 * The global root scope at runtime.
	 */
	export const ROOT: ( Window | NodeJS.Global ) = ( window !== undefined ? window : global !== undefined ? global : self );

	//////
	//
	//  Static Functions
	//
	//////

	/**
	 * Terminates the current process and returns an exit code to the runtime.
	 * @param {number|Int32} exitCode The exit code for the runtime.
	 * @exception {Error} Insufficient security permission to exit.
	 */
	export function exit( exitCode: number = 0 )
	{
		let root = ROOT as any;

		if ( root.process )
		{
			root.process.exit( exitCode );
		}
		else if ( root.close )
		{
			root.close();
		}
		else
		{
			throw new Error( 'The caller does not have sufficient security permission to perform a process exit.' );
		}
	}
}

export default Environment;
