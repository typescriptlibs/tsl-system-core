/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import IDisposable from '../IDisposable';

/**
 * This function provides a convenient mechanism to dispose unmanaged data.
 *
 * @param {IDisposable} obj
 * The object with unmanaged data.
 *
 * @param {Delegate} delegate
 * The delegate that uses the object with unmanaged data.
 *
 * @example
 * using(new Disposable(), (disposable) =>
 * {
 *     disposable.doSomething();
 * });
 */
export function using<T extends IDisposable>( obj: T, delegate: ( obj: T ) => void )
{
	try
	{
		delegate( obj );
	}
	finally
	{
		obj.dispose();
	}
}
