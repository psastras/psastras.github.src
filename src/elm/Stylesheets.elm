port module Stylesheets exposing (..)

import Css.File exposing (..)
import Stylesheets.Main as Main
import Stylesheets.Components.Nav as Nav
import Stylesheets.Components.Logo as Logo


port files : CssFileStructure -> Cmd msg


cssFiles : CssFileStructure
cssFiles =
    toFileStructure [ ( "main.css", compile [ Main.css, Nav.css, Logo.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler files cssFiles
