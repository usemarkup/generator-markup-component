"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red("Markup Component")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Component name",
        default: "ComponentName"
      },
      {
        type: "input",
        name: "namespaces",
        message:
          'Comma separated list of namespaces namespace (e.g. "Base", or "Base, Gant")'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let name = this.props.name;
    let lowercasename = this.props.name
      .replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
      })
      .replace(/^-|-$/g, "");

    let snakeCaseName = name.charAt(0).toLowerCase() + name.slice(1);

    let namespaces = this.props.namespaces.split(",").reduce((agg, ns) => {
      if (ns !== "") agg.push(ns.trim());
      return agg;
    }, []);

    const noBaseComponent =
      !namespaces.find(ns => ns === "Base") &&
      !this.fs.exists(`lib/Base/components/${name}/${lowercasename}.jsx`);

    namespaces.forEach(namespace => {
      const isBaseComponent = namespace === "Base";
      const templateBsePath = isBaseComponent ? "Base/" : "Client/";

      if (
        this.fs.exists(
          `lib/${namespace}/components/${name}/${lowercasename}.jsx`
        )
      ) {
        console.log(
          chalk.red(
            `'lib/${namespace}/components/${name}/${lowercasename}.jsx' already exists; not scaffolding component.`
          )
        );
        return;
      }

      const templateVars = {
        name,
        lowercasename,
        namespace,
        snakeCaseName,
        isBaseComponent,
        noBaseComponent
      };

      // Component file
      this.fs.copyTpl(
        this.templatePath(`${templateBsePath}component.jsx`),
        this.destinationPath(
          `lib/${namespace}/components/${this.props.name}/${lowercasename}.jsx`
        ),
        templateVars
      );

      // Readme file
      this.fs.copyTpl(
        this.templatePath(`${templateBsePath}Readme.md`),
        this.destinationPath(
          `lib/${namespace}/components/${this.props.name}/README.md`
        ),
        templateVars
      );

      // Scss file
      this.fs.copyTpl(
        this.templatePath(`${templateBsePath}component.module.scss`),
        this.destinationPath(
          `lib/${namespace}/components/${this.props.name}/${lowercasename}.module.scss`
        ),
        templateVars
      );

      // Jest file
      this.fs.copyTpl(
        this.templatePath(`${templateBsePath}component.test.js`),
        this.destinationPath(
          `lib/${namespace}/components/${
            this.props.name
          }/${lowercasename}.test.js`
        ),
        templateVars
      );

      // Index
      this.fs.copyTpl(
        this.templatePath(`${templateBsePath}index.js`),
        this.destinationPath(
          `lib/${namespace}/components/${this.props.name}/index.js`
        ),
        templateVars
      );

      console.log(chalk.green(`created 'lib/${namespace}/components/${name}'`));

      // //add line to index.js
      // var indexJsPath = this.destinationPath(`/lib/${namespace}/index.js`);

      // // force overwrite index.js
      // this.conflicter.force = true;

      // this.fs.copy(indexJsPath, indexJsPath, {
      //     process: (content) => {
      //         let parsed = esprima.parse(content.toString(), { sourceType: 'module' });
      //         parsed.body.push(
      //           esprima.parse(
      //             `export { default as ${name} } from './components/${name}';`,
      //             { sourceType: 'module' }
      //           )
      //         );
      //         return escodegen.generate(parsed);
      //     }
      // });
    });

    // this.fs.copy(
    //   this.templatePath("dummyfile.txt"),
    //   this.destinationPath("dummyfile.txt")
    // );
  }

  install() {
    // this.installDependencies();
  }
};
