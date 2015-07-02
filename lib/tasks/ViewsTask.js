var inherits = require('util').inherits,
    Task = require('./Task'),
    merge = require('merge-stream'),
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    gulp = require('gulp'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    changed = require('gulp-changed');

var ViewsTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ViewsTask, Task);

ViewsTask.prototype.command = "views";
ViewsTask.prototype.availableToModule = false;
ViewsTask.prototype.action = function () {
    return merge(
        gulp.src(this._buildHelper.options.views + '/**/*.html')
            .pipe(changed(this._buildHelper.getTemporaryDirectory() + this._buildHelper.options.views + '/'))
            .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory() + this._buildHelper.options.views + '/'))
            .pipe(gulpif(this._buildHelper.isWatching(), refresh(this._buildHelper.liveReloadServer))),
        gulp.src('index.html')
            .pipe(gulpif(this._buildHelper.isWatching(), embedlr()))
            .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory()))
    );
};

module.exports = ViewsTask;