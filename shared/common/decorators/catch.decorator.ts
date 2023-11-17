export const CatchAllAsync =
	(handler: (error: Error) => void) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;
		const wrappedFunction = async function (...args: any[]) {
			try {
				return await originalMethod.apply(this, args);
			} catch (error) {
				return handler(error);
			}
		};
		Object.defineProperty(wrappedFunction, 'name', {
			value: originalMethod.name,
			configurable: true,
			writable: true,
		});
	};

export const CatchAll =
	(handler: (error: Error) => void) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;
		const wrappedFunction = function (...args: any[]) {
			try {
				return originalMethod.apply(this, args);
			} catch (error) {
				return handler(error);
			}
		};
		Object.defineProperty(wrappedFunction, 'name', {
			value: originalMethod.name,
			configurable: true,
			writable: true,
		});
	};
