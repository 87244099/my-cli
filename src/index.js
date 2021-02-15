const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const Utils = require("./utils");
const commander = require('commander');
const program = new commander.Command();

let cwdPath = process.cwd();
let assetsPath = path.resolve(__dirname, "../assets");
let templateProjectPath = path.resolve(assetsPath, "template");
let dependences = require(path.resolve(assetsPath, "dependencies"));

let CmdDef = {
    create: {
        cmd: "create <name>",
        description: "创建项目",
        action(name){
            // 创建项目文件夹
            let createdProjectPath = path.resolve(cwdPath, name);
            if(!fs.existsSync(createdProjectPath) || !fs.statSync(createdProjectPath).isDirectory()){
                fs.mkdirSync(createdProjectPath);
            }
            // 进入对应目录
            process.chdir(path.resolve(process.cwd(), name));
            cwdPath = process.cwd();
            console.log("cwdPath", process.cwd());            
            // 安装依赖
            callSomeCmdAction(
                "init",
            );            
        }
    },
    init: {
        cmd: "init",
        description: "初始化项目，包括生成项目结构，安装依赖",
        action(){
            callSomeCmdAction(
                'generate',
                'install',
            )
        }
    },
    generate: {
        cmd: "generate",
        description: "生成项目结构",
        action(){
            console.log("generate");
            // 生成项目骨架
            Utils.copyDirectorySync(templateProjectPath, process.cwd());
        }
    },
    install: {
        cmd: "install",
        description: "安装依赖",
        action(){
            console.log("初始化包");
            child_process.spawnSync(`npm`, ["init"], 
            {
                cwd: process.cwd(),
                stdio: 'inherit',
                shell: true, // 在shell下执行
            });
            console.log("初始化完成");

            console.log("开始安装依赖...")
            dependences.unshift("install");
            dependences.push("--save-dev");
            child_process.spawnSync(`npm`, dependences, 
            {
                cwd: process.cwd(),
                stdio: 'inherit',
                shell: true, // 在shell下执行
            });

            console.log("安装结束...");
        }
    },
    dev: {
        cmd: "dev",
        description: "启动开发环境",
        action(){
            child_process.spawnSync(`yarn`, ["webpack", "serve"], 
            {
                cwd: process.cwd(),
                stdio: 'inherit',
                shell: true, // 在shell下执行
            });
        }
    },
    test: {
        cmd: "test",
        description: "测试",
        action(){
            child_process.spawnSync(`yarn`, ["jest"], 
            {
                cwd: process.cwd(),
                stdio: 'inherit',
                shell: true, // 在shell下执行
            });
        }
    },
    build: {
        cmd: "build",
        description: "构建项目",
        action(){
            child_process.spawnSync(`yarn`, ["webpack", "build"], 
            {
                cwd: process.cwd(),
                stdio: 'inherit',
                shell: true, // 在shell下执行
            });
        }
    },
}

Object.keys(CmdDef).forEach(key=>{
    let defValue = CmdDef[key];
    program.command(defValue.cmd)
        .description(defValue.description)
        .action((defValue.action));
});

program.parse(process.argv);

function callSomeCmdAction(actions){
    actions = Array.isArray(actions) ? actions : [...arguments];
    actions.forEach(type=>{
        CmdDef[type].action();
    });
}