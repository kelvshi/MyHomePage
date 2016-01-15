var fs = require("fs");
var basePath = "./src";
var menu = {};

var Tools = {
	// 读取文件目录
	readDir:function(dir){
		var self = this;
		fs.readdir(dir, function(err,flies) {
			var leng = flies.length;
			if(leng > 0){
				for (var i = 0; i < leng; i++) {
					var this_file = flies[i];
					self.readDirInfo(dir,this_file);
				};
			}
		});
	},
	// 读取目录/文件信息
	readDirInfo:function(dir,file){
		var self = this;
		var startDir = dir;
		var dir = dir + "/" + file;
		fs.stat(dir,function(err, flies){
			var flag = flies.isDirectory();
			if(!flag){
				// var dirValue = menu[startDir];
				// if(dirValue){
				// 	dir = "," + dir;
				// }
				// menu[startDir] = dir;
				self.writeInfo(dir + "\n" );
			}else{
				self.readDir(dir);
			}
		})
	},
	// 写入文件中
	writeInfo:function(data){
		var self = this;
		fs.appendFile("menu.json", data, function(err){
			if(err){
				console.error(err);
			}else{
				console.log("写入menu.json成功");
			}
		})
	},

	// 重命名文件
	rename:function(oldPath,newPath){
		fs.rename(oldPath, newPath, function(err){
			console.log(oldPath + "已经重命名为" + newPath);
		});
	}
}

module.exports = Tools;