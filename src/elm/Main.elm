module Main exposing (..)

import Html exposing (..)
import Navigation exposing (Location)
import UrlParser exposing (Parser, top, (</>), s, int, string, map, oneOf, parseHash)
import Components.Nav exposing (..)
import Pages.Home exposing (..)
import Pages.NotFound exposing (..)
import Pages.Code exposing (..)
import Navigation
import SharedStyles exposing (..)
import Routing exposing (..)


main : Program Never Model Msg
main =
    Navigation.program UrlChange
        { init = init
        , view = view
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }



-- MODEL


type alias Model =
    { route : Route
    , codePage : Pages.Code.Model
    }


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    ( { route = (parseLocation location)
      , codePage = Pages.Code.init
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = UrlChange Navigation.Location


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ UrlParser.map HomeRoute top
        , UrlParser.map CodeRoute (UrlParser.s "code")
        ]


parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            NotFoundRoute


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            let
                route =
                    (parseLocation location)
            in
                case route of
                    HomeRoute ->
                        ( { model | route = route }, Cmd.none )

                    NotFoundRoute ->
                        ( { model | route = route }, Cmd.none )

                    CodeRoute ->
                        ( { model | route = route, codePage = Pages.Code.onLoad }, Cmd.none )



-- VIEW


{ id, class, classList } =
    mainNamespace


view : Model -> Html msg
view model =
    div [ class [ Container ] ]
        [ Components.Nav.nav model.route
        , div [ class [ PageContainer ] ]
            [ case model.route of
                HomeRoute ->
                    home

                NotFoundRoute ->
                    notFound

                CodeRoute ->
                    Pages.Code.code
            ]
        ]
