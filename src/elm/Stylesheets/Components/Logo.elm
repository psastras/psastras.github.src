module Stylesheets.Components.Logo exposing (css)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.Namespace exposing (namespace)
import SharedStyles exposing (..)


css : Stylesheet
css =
    (stylesheet << namespace logoNamespace.name)
        [ class LogoContainer
            [ border3 (Css.rem 0.25) solid (rgb 255 255 255)
            , padding2 (Css.rem 0.25) (Css.rem 1.5)
            , margin (Css.rem 5)
            , children
                [ h1 [ textTransform uppercase ] ]
            ]
        ]
