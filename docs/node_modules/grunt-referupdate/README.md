# grunt-referupdate

> Update references in files of your choice only if the referenced file exists.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-referupdate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-referupdate');
```

## The "referUpdate" task

### Overview
In your project's Gruntfile, add a section named `referUpdate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  referUpdate: {
    options: {
      prefix = "/"
    },
    your_target: {
      files: [ //Reference filepaths to update
        {
          expand: true,
          cwd: '',
          src: '',  //Original path to file,
          dest: ''  //Updated path to file
        },
      ],
      update:{ //Files where you want to update the references.
        files:[
          {
            expand: true,
            cwd: '',  
            src: '',  //Specifies which files will have their references updated
            dest: '', //Leave blank to update references; otherwise copies into dest
          },
        ],
      },
    },
  },
});
```
### files

These are the [files](http://gruntjs.com/configuring-tasks#files) that are the references. The src is the old(original) reference, and the dest is the new(updated) reference. So it maps from src -> dest; the task searches for instances of src filepaths in the files you want to update, and replaces them with the dest filepath. It only replaces files that exist in the specified destination, however.

### update

These are the [files](http://gruntjs.com/configuring-tasks#files) that you wish to update the references in. Files from src will have any matched references replaced with the new ones. The new versions will be output to dest. Leave dest blank to update the files without making a copy.

### Options

#### options.prefix
Type: `String`
Default value: `'/'`

A string value that is used to prefix file paths
So if, in your reference, you have `/path/to/reference.ext` but your


### Usage Examples

Say you have a file structure like this:

```
images/
├──subdir1/
|  ├── image1.png
|  └── image2.jpg
└──subdir2/
   ├── image3.svg
   └── image4.gif
```

In your .html, .md, .css, ... files you have references to them, like so: `![my awesome image](/images/subdir1/image2.jpg)` or `![my moving image](/images/subdir2/image4.gif)`.
But lets say you decide to do some bulk processing, changing the files and moving the file structure, so its now like this:
```
images/  
├──processed/  
|  ├──subdir1/  
|  |  └── image1.png  
|  └──subdir2/  
|     └── image4.gif  
|    
├──subdir1/  
|  ├── image1.png  
|  └── image2.jpg  
└──subdir2/  
   ├── image3.svg  
   └── image4.gif  
```
But notice that some files didn't process for some reason. This task will update all old references to the new ones (if they exist), in the files you specify. So `![my awesome image](/images/subdir1/image2.jpg)` doesnt change, since it didn't get processed, but `![my moving image](/images/subdir2/image4.gif)` changes to `![my moving image](/images/processed/subdir2/image4.gif)`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
