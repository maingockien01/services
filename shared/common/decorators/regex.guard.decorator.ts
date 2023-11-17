/**
 * @throws BadRequestException
 */
export const RegexGuard = (regexExp: RegExp, exceptionMessage: string = null): PropertyDecorator => {
	return (target: object, propertyKey: string) => {
		const propertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

		let value: string;

		const getter = function () {
			return propertyDescriptor?.get.call(this) ?? value;
		};

		const setter = function (newVal) {
			if (!newVal || typeof newVal !== 'string' || !regexExp.test(newVal)) {
				throw new Error(exceptionMessage ?? `Invalid ${String(propertyKey)} format`);
			}

			value = newVal;

			propertyDescriptor?.set.call(this, newVal);
		};

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	};
};
