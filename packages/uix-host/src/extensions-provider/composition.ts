import { InstalledExtensions, ExtensionsProvider } from "../host.js";

export function combineExtensionsFromProviders(
  ...providers: Array<ExtensionsProvider>
): ExtensionsProvider {
  return () =>
    Promise.all(providers.map((ep: ExtensionsProvider) => ep())).then(
      (extensionsBatches: Array<InstalledExtensions>) => {
        return Object.assign({}, ...extensionsBatches);
      }
    );
}