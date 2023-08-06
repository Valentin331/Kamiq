const tar = require('tar');
const fs = require('fs');
const path = require('path');

const moveFiles = async (source, target) => {
  const files = await fs.promises.readdir(source, { withFileTypes: true });

  for (const file of files) {
    const oldPath = path.join(source, file.name);
    const newPath = path.join(target, file.name);

    if (file.isDirectory()) {
      // Create the new directory in the target path
      await fs.promises.mkdir(newPath, { recursive: true });
      // Move files from old directory to the new one
      await moveFiles(oldPath, newPath);
      // Remove the old directory
      await fs.promises.rmdir(oldPath);
    } else {
      // Move the file
      await fs.promises.rename(oldPath, newPath);
    }
  }
};

const repack = async () => {
  // Read package.json
  const packageJson = JSON.parse(await fs.promises.readFile('./package.json', 'utf8'));

  // Construct the filename
  const filename = `${packageJson.name}-${packageJson.version}.tgz`;

  // Unpack the .tgz file
  await tar.x({
    file: filename,
    cwd: './'
  });

  // Move all contents of the /dist folder to the root of the package folder
  await moveFiles('./package/dist/', './package/');

  // Delete the /dist folder
  await fs.promises.rmdir('./package/dist/', { recursive: true });

  // Package it back again
  await tar.c({
    gzip: true,
    file: filename,
    cwd: './',
  }, ['package']);

  await fs.promises.rmdir('package', { recursive: true })
};

repack().catch(console.error);
