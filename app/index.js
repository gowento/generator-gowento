const Generator = require('yeoman-generator');
const yosay = require('yosay');
const slug = require('slug');
const camel = require('camelcase');
const path = require('path');

module.exports = class extends Generator {
  init() {
    this.log(yosay('☭ Gowento Yeoman Generator.'));

    return this.prompt([
      {
        name: 'moduleName',
        message: 'What is the module name?',
        filter: slug,
        default: path.basename(process.cwd()).replace(/\s/g, '-'),
      },
      {
        name: 'moduleDesc',
        message: 'What is the module description?',
        default: props => props.name,
      },
    ])
    .then(props => {
      const tpl = {
        moduleName: props.moduleName,
        moduleDesc: props.moduleDesc,
        camelModuleName: camel(props.moduleName),
        name: this.user.git.name(),
        email: this.user.git.email(),
      };


      this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), tpl);

      const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to));
      mv('index.js', 'src/index.js');
      mv('test.js', 'test/index.js');
      mv('babelrc', '.babelrc');
      mv('gitignore', '.gitignore');
      mv('eslintrc', '.eslintrc');
      mv('eslintignore', '.eslintignore');
      mv('npmignore', '.npmignore');
    });
  }

  git() {
    this.spawnCommandSync('git', ['init']);
  }

  install() {
    this.installDependencies({ bower: false, npm: false, yarn: true });
  }
};
