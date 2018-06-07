/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import IDisposable from '../IDisposable';
import { default as Object } from '../Object';

let _lockStates: { [key: number]: Array<ILockCallback> } = {};

/**
 * The lock container with callback functions for the lock states.
 */
export interface ILockCallback
{
	/**
	 * The function is called, when the lock state has been left because of an
	 * error.
	 */
	catch: ( reason: Error ) => void;

	/**
	 * The function is called, when the lock state has been reached.
	 */
	locked: ( objLock: Object ) => void;
}

/**
 * #experimental
 * This function provides a convenient mechanism to lock a function on an
 * objects hash code. Primitive objects like string should not be used as lock
 * objects, because their hash code is not unique.
 *
 * @param {Object} objLock The object to lock the locked callback function on.
 *
 * @param {currentLockState} lockCallback The lock with the callback functions.
 *
 * @example
 * let objectLock = new Object();
 * lock(objectLock, {
 *    locked: (objectLock) => {
 * 		  // do things during lock state
 *    },
 *    catch: (error) => {
 * 		  // handle error
 *    }
 * });
 */
export function lock( objLock: Object, lockCallback: ILockCallback )
{
	let objHashCode = objLock.getHashCode();

	// Lock state is already active.
	if ( _lockStates[objHashCode] !== undefined )
	{
		_lockStates[objHashCode].push( lockCallback );
	}
	// Create new lock state and walk through attached callback functions.
	else
	{
		try
		{
			_lockStates[objHashCode] = [lockCallback];

			let currentLockState = undefined as ( ILockCallback | undefined );

			while ( ( currentLockState = _lockStates[objHashCode].shift() ) !== undefined )
			{
				try
				{
					currentLockState.locked.call( objLock, objLock );
				}
				catch ( error )
				{
					setTimeout( currentLockState.catch, 0, error );
				}
			}
		}
		finally
		{
			delete _lockStates[objHashCode];
		}
	}
}

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
