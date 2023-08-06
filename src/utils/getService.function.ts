import { container } from 'tsyringe';

/**
 * Cache for services that have been resolved
 * @type {Object.<string, any>}
 */
const services: { [key: string]: any } = {};

/**
 * Retrieves a service from the cache or resolves it from the container if it
 * has not been retrieved before. The resolved service is cached for future use.
 * This function enables lazy loading of services.
 *
 * @template T - The type of the service
 *
 * @param {string} serviceName - The name of the service to retrieve
 *
 * @returns {T} The resolved service
 *
 * @throws {Error} If the service could not be resolved
 */
export function getService<T>(serviceName: string): T {
  if (!services[serviceName]) {
    services[serviceName] = container.resolve<T>(serviceName);
  }
  return services[serviceName];
}