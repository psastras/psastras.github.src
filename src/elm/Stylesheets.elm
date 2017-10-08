port module Stylesheets exposing (..)

import Css.File exposing (..)
import Stylesheets.Main as Main
import Stylesheets.Components.Nav as Nav


port files : CssFileStructure -> Cmd msg


cssFiles : CssFileStructure
cssFiles =
    toFileStructure [ ( "main.css", compile [ Main.css, Nav.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler files cssFiles
