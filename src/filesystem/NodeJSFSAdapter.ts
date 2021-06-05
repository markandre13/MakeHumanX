import * as fs from 'fs'
import * as path from 'path'
import { AbstractFileSystemAdapter } from './AbstractFileSystemAdapter'

export class NodeJSFSAdapter implements AbstractFileSystemAdapter {
    readFile(pathname: string): string { 
        try {
            return fs.readFileSync(pathname).toString('utf8')
        }
        catch(e) {
            console.log(`### FAILED TO READ ${pathname}`)
            throw e
        }
    }
    isFile(pathname: string): boolean { return fs.lstatSync(pathname).isFile() }
    isDir(pathname: string): boolean { return fs.lstatSync(pathname).isDirectory() }
    listDir(pathname: string): string[] {
        // console.log(`listDir('${pathname}')`)
        return fs.readdirSync(pathname)
    }
    realPath(pathname: string): string {
        const result = path.join(__dirname, '../../data/' + pathname)
        // console.log(`realPath('${pathname}') -> '${result}' (__dirname='${__dirname}, __filename='${__filename}')`)
        return result
    }
    joinPath(pathname1: string, pathname2: string): string { return path.join(pathname1, pathname2) }
}
