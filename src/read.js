const fs = require('fs');
const path = require('path');

/* Обязательный аргумент передается просто ссылкой, например /home/roman/Документы/Git/Homework/ */
/* Глубина передается, через опциональный флаг --depth или -d */

const arguments = process.argv.slice(2);
const pathToDir = arguments.find((elem) => !elem.includes('--depth=') || !elem.includes('-d='));

if (!pathToDir) {
  return console.error('🤯🤯🤯', '\x1b[31m', 'Не указан обязательный аргумент "путь до директории"');
}

const d = Number.parseInt(arguments.find((elem) => elem.includes('--depth=') || elem.includes('-d='))?.split('=')[1] || 0);
const depth = d < 0 || isNaN(d) ? 0 : d;

const currentPath = path.resolve(pathToDir);

function IterateTree(pathTree, number) {
  let iterate = number;

  fs.readdirSync(pathTree).forEach((elem, index) => {
    if (index === 0) {
      iterate = iterate + 1;
    }

    const stats = fs.statSync(path.resolve(pathTree, elem));
    const isDirectory = stats.isDirectory();
    const isFile = stats.isFile();
    const symbolIterate = iterate - 1;

    if (isFile) {
      console.log('-'.repeat(symbolIterate), elem);
    }

    if (isDirectory && iterate <= depth) {
      console.log('-'.repeat(symbolIterate), '/', elem);
      const localPath = path.resolve(pathTree, elem);
      IterateTree(localPath, iterate);
    } else if (isDirectory) {
      console.log('-'.repeat(symbolIterate), '/', elem);
    }
  });
}

IterateTree(currentPath, 0);
