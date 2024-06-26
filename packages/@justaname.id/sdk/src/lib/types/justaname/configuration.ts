/**
 * Represents the configuration options available for initializing the application.
 * 
 * This interface is designed to be flexible, allowing for future expansion with additional
 * configuration options as needed.
 * 
 * @interface Configuration
 * @property {string} [apiKey] - An optional API key used for authenticating requests
 *                               to the service. If provided, the API key is used to
 *                               access features or endpoints that require authentication.
 */
export interface Configuration {
  apiKey?: string;
}