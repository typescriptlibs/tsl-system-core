/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  System Core TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import EventArgs from './EventArgs';
import Object from '../Object';

/**
 * This is a delegate for the event system.
 */
export interface IEventHandler<TEventArgs extends EventArgs = EventArgs>
{
	/**
	 * This is the event handler delegate.
	 */
	( sender: Object, e: TEventArgs ): any;

	/**
	 * This is the generated uniqueID to identify the event handler.
	 */
	uniqueID?: number;
}

export default IEventHandler;
