export const defaultSelectedVersions = (versions: string[]): string[] => {
  var selectedVersions = [];
  var i = versions.length - 1;
  while (i >= 0 && selectedVersions.length < 3) {
    if (isStableVersion(versions[i])) {
      selectedVersions.push(versions[i]);
    }

    --i;
  }

  if (selectedVersions.length === 0) {
    return versions.slice(-3).reverse();
  }

  const lastVersion = selectedVersions[0];
  if (lastVersion.indexOf(".") !== -1) {
    const major = lastVersion.substring(0, lastVersion.indexOf("."));
    selectedVersions.push(major + ".*");
  }

  return selectedVersions;
};

const isStableVersion = (version: string) => {
  var regex = new RegExp(/^\d+(\.\d+)*$/);
  return regex.test(version);
};
